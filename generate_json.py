import json
import os
from datetime import datetime

posts = []
posts_dir = "posts"  # Carpeta donde están tus .md o .html

for filename in os.listdir(posts_dir):
    if filename.endswith(".md"):
        with open(os.path.join(posts_dir, filename), 'r') as f:
            content = f.read()
            # Extrae metadatos (ajusta según tu formato)
            title = content.split('title: ')[1].split('\n')[0].strip('"')
            date = content.split('date: ')[1].split('\n')[0].strip('"')
            summary = content.split('summary: ')[1].split('\n')[0].strip('"')
            
            posts.append({
                "title": title,
                "date": date,
                "summary": summary,
                "url": f"https://coreltech.github.io/corel_blog/posts/{filename.replace('.md', '')}",
                "image": f"https://coreltech.github.io/corel_blog/images/{filename.replace('.md', '.webp')}"
            })

# Ordena por fecha (más reciente primero)
posts.sort(key=lambda x: datetime.strptime(x["date"], "%Y-%m-%d"), reverse=True)

with open('blog.json', 'w') as f:
    json.dump(posts, f, indent=2)

print("blog.json generado con éxito!")