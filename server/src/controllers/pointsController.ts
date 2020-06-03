import { Request, Response, request } from "express";
import knex from "../database/connection";

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim())); //trim tira os espaços da direita e da esquerda para nao dar bug ao dar split com a ,

    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct() //se um ponto retornar o id 1 e 2 ele so vai aparecer 1x e nao 2x
      .select("points.*");

    return response.json(points);
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    //como a segunda insercao depende da primeira e se a segunda falhar
    //a 1a ta smp a executar com o transaction se a 2a falhar a 1a nao executa
    const trx = await knex.transaction();

    const point = {
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=40",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedId = await trx("points").insert(
      //nesta insercao e retornado o id do objeto que foi inserido
      point
    );

    const point_id = insertedId[0];

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });

    await trx("point_items").insert(pointItems);

    await trx.commit(); //faz os inserts na bd

    return response.json({
      id: point_id,
      ...point,
    });
  }

  //mostrar um ponto de entrega especifico
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex("points").where("id", id).first();

    if (!point)
      return response.status(400).json({ message: "Point not found." });

    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title");

    return response.json({ point, items });
  }
}

export default PointsController;
