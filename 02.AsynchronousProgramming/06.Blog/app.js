function attachEvents() {
   const postsUrl='http://localhost:3030/jsonstore/blog/posts';
   const commentsUrl='http://localhost:3030/jsonstore/blog/comments';

   const postSelect=document.getElementById('posts');
   const postsBtn=document.getElementById('btnLoadPosts')
   .addEventListener('click',getPosts);
   const viewBtn=document.getElementById('btnViewPost')
   .addEventListener('click',showPost);

   async function showPost(){
            let response= await fetch(`${commentsUrl}`);
            let data=await response.json();
            //console.log(data);
            let selectedCommentsArr=[];
    for (const item of postSelect) {
        if(item.selected){
            let id=item.value;         
          for (const comment of Object.entries(data)) {
            if(comment[1].postId==id){
                selectedCommentsArr.push(comment);
            }
          }
          //array of json object with desired comments
          let postTitleEl=document.getElementById('post-title');
          postTitleEl.textContent=item.text;

          let currPost=await fetch(`${postsUrl}/${id}`)
          let currPostData=await currPost.json();

          let postBodyEl=document.getElementById('post-body');
          postBodyEl.textContent=currPostData.body;
            
          let postCommentsEl=document.getElementById('post-comments');
          for (const comment of selectedCommentsArr) {
            let li=document.createElement('li');
           li.textContent=comment[1].text;
           postCommentsEl.appendChild(li);
          }
        }
    }
   
   }
   async function getPosts(){
    let response=await fetch(postsUrl);
    let data=await response.json();
    for (const item of Object.entries(data)) {
        let option=document.createElement('option');
        option.text=item[1].title;   
        option.value=item[1].id;
        postSelect.appendChild(option);    
    }
   }
}

attachEvents();