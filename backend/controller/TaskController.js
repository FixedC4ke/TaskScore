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

async function sendResponse(req, res) {
  if (req.user.role !== 2) {
    return res.status(403).send({
      error: "Необходимо быть исполнителем, чтобы откликнуться на задачу",
    });
  }
  let { task_id, suggested_cost } = req.body;
  if (!task_id) {
    return res.send({ error: "Некорректный запрос" });
  }
  let existingResponse = await knex("responses").where({
    task_id: task_id,
    executor_user_id: req.user.id,
  });
  if (existingResponse.length > 0) {
    return res.status(409).send({
      error: "С этого аккаунта уже был отправлен отклик на эту задачу",
      info: existingResponse[0],
    });
  }
  let result = await knex("responses").insert({
    id: uuid(),
    task_id: task_id,
    executor_user_id: req.user.id,
    conversation_id: null,
    suggested_cost: suggested_cost,
    timestamp: new Date(),
  });
  if (result.rowCount === 1) {
    return res.send({ success: true });
  }
  return res.send({ error: "Непридвиденная ошибка" });
}

async function applyResponse(req, res) {
  if (req.user.role !== 1) {
    return res.send({
      error: "Необходимо быть заказчиком, чтобы принять отклик",
    });
  }
  let { response_id } = req.body;
  if (!response_id) {
    return res.send({ error: "Некорректный запрос" });
  }
  let appliedResponse = await knex("responses")
    .where({ id: response_id })
    .first();
  let updatedTask = await knex("tasks")
    .where({ id: appliedResponse.task_id })
    .update({
      executor_user_id: appliedResponse.executor_user_id,
      cost: appliedResponse.suggested_cost,
      begin_date: new Date(),
    });
  knex("responses")
    .where({
      task_id: appliedResponse.task_id,
    })
    .whereNot({ id: response_id })
    .update({ isactive: false })
    .then(() => {
      if (updatedTask > 0) {
        return res.send({ success: true });
      } else {
        return res.send({ error: "Непредвиденная ошибка" });
      }
    });
}

async function submit(req, res) {
  let { task_id } = req.body;
  let result = knex("tasks")
    .where({ id: task_id })
    .update({ end_date: new Date() });
  if (result > 0) {
    return res.send({ success: true });
  } else {
    return res.send({ error: "Указанная задача не существует" });
  }
}

module.exports = { get, create, score, sendResponse, applyResponse, submit };
