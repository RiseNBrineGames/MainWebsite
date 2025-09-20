// --- LIST VIEW (index.html) ---
const postList = document.getElementById("post-list");
if (postList) {
  fetch("/blog/posts.json")
    .then(res => res.json())
    .then(posts => {
      postList.innerHTML = "";
      posts.forEach(post => {
        const li = document.createElement("li");
        li.innerHTML = `
          <a onclick="openPost('${encodeURIComponent(post.file)}')">
            ${post.title} (${post.date})
          </a>
        `;
        postList.appendChild(li);
      });
    })
    .catch(err => {
      postList.innerHTML = "<li>Error loading posts</li>";
      console.error(err);
    });
}

const newspaper = document.getElementById("newspaper");
const newsSource = document.getElementById("news-source");
function openPost(file) {
    newspaper.hidden = false;
    newsSource.src = "/blog/post.html?file="+file;
    newspaper.scrollIntoView({behavior: "smooth"});
}

// --- SINGLE POST VIEW (post.html) ---
const contentDiv = document.getElementById("content");
if (contentDiv) {
  const params = new URLSearchParams(window.location.search);
  const postFile = params.get("file");

  if (postFile) {
    fetch("posts/" + postFile)
      .then(res => res.text())
      .then(md => {
        contentDiv.innerHTML = marked.parse(md);
      })
      .catch(err => {
        contentDiv.innerHTML = "<p>Error loading post.</p>";
        console.error(err);
      });
  }
}
