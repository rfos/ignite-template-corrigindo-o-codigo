const express = require("express");

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const repositories = [];

function checkRepositoryExists (request, response, next) {

  const { id } = request.params;

  const repository = repositories.find((repository) => repository.id === id);

  if (!repository) return response.status(404).json({error: 'Repository not found 😢'});

  request.repository = repository;

  return next();
}

app.get("/repositories", (request, response) => {
  return response.status(201).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuidv4(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", checkRepositoryExists, (request, response) => {
  const { id } = request.params;
  
  const {title, url, techs} = request.body;

  // OK
  repositoryIndex = repositories.find(repository => repository.id === id);
  

  repository[repositoryIndex].title = title;
  repository[repositoryIndex].url = url;
  repository[repositoryIndex].techs = techs;



  const updatedRepository = {
    title,
    url,
    techs
  } 

  
  const repository = { ...repositories[repositoryIndex], ...updatedRepository };
  

  repositories.push(repository);
  // 

  return response.json(repositories);

});

app.delete("/repositories/:id", checkRepositoryExists, (request, response) => {
  
  const { id } = request.params;
  const repository = request

  repositories.splice(repository, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const likes = ++repositories[repositoryIndex].likes;

  return response.json('likes');
});

module.exports = app;
