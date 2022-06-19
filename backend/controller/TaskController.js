const knex = require("../config/db");
const { v4: uuid } = require("uuid");

async function get(req, res) {
  let { id, role } = req.user;
  if (role === 1) {
    let tasks = await knex("tasks").where({ client_user_id: id });
    return res.json(tasks);
  }
  if (role === 2) {
    let tasks = await knex("tasks").where({ executor_user_id: id });
    return res.json(tasks);
  }
  return res.send({
    error:
      "Необходимо быть заказчиком или исполнителем для просмотра доступных задач",
  });
}

async function create(req, res) {
  let { title, description } = req.body;
  if (!title || !description) {
    return res.send({ error: "Некорректный запрос" });
  }
  if (req.user.role !== 1) {
    return res.send({
      error: "Необходимо быть заказчиком, чтобы создать задачу",
      success: false,
    });
  }
  let creation = await knex("tasks").returning("title").insert({
    id: uuid(),
    client_user_id: req.user.id,
    creation_date: new Date(),
    title: title,
    description: description,
  });
  if (creation) return res.json({ info: creation[0] });
}

async function score(req, res) {
  if (req.user.role === 1) {
    let { id, score } = req.body;
    let result = await knex("tasks")
      .where({ id: id, client_user_id: req.user.id })
      .update({ score: score });
    if (result > 0) {
      return res.send({ success: true });
    } else {
      return res.send({
        error:
          "Данная задача либо не существует, либо принадлежит другому заказчику",
      });
    }
  } else {
    return res.send({
      error: "Необходимо быть заказчиком, чтобы оценить задачу",
    });
  }
}

module.exports = { get, create, score };
