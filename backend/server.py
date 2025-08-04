import os
import uuid
from datetime import datetime
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from motor.motor_asyncio import AsyncIOMotorClient

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client.blog_database

class PostModel(BaseModel):
    id: Optional[str] = None
    title: str
    content: str
    excerpt: str
    category: str
    tags: List[str] = []
    author: str = "Frontend no Celular (Alírio Neto)"
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    source_urls: List[str] = []
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class CommentModel(BaseModel):
    id: Optional[str] = None
    post_id: str
    author: str
    email: str
    content: str
    created_at: Optional[datetime] = None

@app.get("/api/posts")
async def get_posts(
    category: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = 10,
    skip: int = 0
):
    query = {}
    if category:
        query["category"] = category
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"content": {"$regex": search, "$options": "i"}},
            {"tags": {"$in": [search]}}
        ]
    
    posts = await db.posts.find(query, {"_id": 0}).skip(skip).limit(limit).to_list(limit)
    return posts

@app.get("/api/posts/{post_id}")
async def get_post(post_id: str):
    post = await db.posts.find_one({"id": post_id}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@app.post("/api/posts")
async def create_post(post: PostModel):
    post.id = str(uuid.uuid4())
    post.created_at = datetime.now()
    post.updated_at = datetime.now()
    
    await db.posts.insert_one(post.dict())
    return post

@app.get("/api/categories")
async def get_categories():
    categories = await db.posts.distinct("category")
    return categories

@app.get("/api/posts/{post_id}/comments")
async def get_comments(post_id: str):
    comments = await db.comments.find({"post_id": post_id}, {"_id": 0}).to_list(100)
    return comments

@app.post("/api/posts/{post_id}/comments")
async def create_comment(post_id: str, comment: CommentModel):
    comment.id = str(uuid.uuid4())
    comment.post_id = post_id
    comment.created_at = datetime.now()
    
    await db.comments.insert_one(comment.dict())
    return comment

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)