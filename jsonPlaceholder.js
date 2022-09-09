"use strict";

let requestCount = 0;

const requestPosts = () => {
  let content = document.getElementById("content");
  content.innerHTML = "";
  let posts;
  requestCount++;

  content.insertAdjacentHTML(
    "beforeend",
    `
    <tr>
      <th>User ID</th>
      <th>ID</th>
      <th>Title</th>
      <th>Body</th>
    </tr>
      <tbody>`
  );

  let data = async () =>
    (await fetch("https://jsonplaceholder.typicode.com/posts")).json();
  data()
    .then((res) => {
      console.log(res);
      posts = res;
      posts.forEach((post) => {
        content.insertAdjacentHTML(
          "beforeend",
          `
          <tr>
          <td>${post.userId}</td>
          <td>${post.id}</td>
          <td>${post.title}</td>
          <td>${post.body}</td>
        </tr>
        `
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });

  content.insertAdjacentHTML(
    "beforeend",
    `</tbody>
  `
  );

  if (requestCount < 2) {
    const actions = document.querySelector("#actions");
    const sortButton = document.createElement("button");
    const groupButton = document.createElement("button");
    sortButton.innerText = "Sort alphabetically by title";
    groupButton.innerText = "Group by user ID";
    actions.append(sortButton);
    actions.append(groupButton);

    const sortTitle = () => {
      content.innerHTML = "";
      posts.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });
      content.insertAdjacentHTML(
        "beforeend",
        `<tr>
              <th>User ID</th>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
              <tbody>`
      );
      posts.forEach((post) => {
        content.insertAdjacentHTML(
          "beforeend",
          `
              <tr>
              <td>${post.userId}</td>
              <td>${post.id}</td>
              <td>${post.title}</td>
              <td>${post.body}</td>
            </tr>
            `
        );
      });
      content.insertAdjacentHTML("beforeend", `</tbody>`);
    };

    const groupUser = () => {
      content.innerHTML = "";
      const users = [...new Set(posts.map((post) => post.userId))];
      users.sort(function (a, b) {
        return a - b;
      });
      posts.sort((a, b) => {
        const idA = a.id;
        const idB = b.id;
        if (idA < idB) {
          return -1;
        }
        if (idA > idB) {
          return 1;
        }
        return 0;
      });
      for (let i = 0; i < users.length; i++) {
        content.insertAdjacentHTML(
          "beforeend",
          `<thead>User ID: ${users[i]}</thead>
                  <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Body</th>
                </tr>
                  <tbody>`
        );
        for (let j = 0; j < posts.length; j++) {
          if (users[i] === posts[j].userId) {
            content.insertAdjacentHTML(
              "beforeend",
              `
                    <tr>
                    <td>${posts[j].id}</td>
                    <td>${posts[j].title}</td>
                    <td>${posts[j].body}</td>
                  </tr>
                  `
            );
          }
        }
        content.insertAdjacentHTML("beforeend", `</tbody>`);
      }
    };

    sortButton.addEventListener("click", sortTitle);
    groupButton.addEventListener("click", groupUser);
  }
};

document.querySelector("#request").addEventListener("click", requestPosts);
