import Knex from "knex";

/**
 * Os seeds servem para que a app va para o ar com algumas informaçoes la dentro
 */

export async function seed(knex: Knex) {
  await knex("items").insert([
    //criar os items defaults que a aplicacao vai ter
    {
      title: "Lâmpadas",
      image: "lampadas.svg",
    },
    {
      title: "Pilhas e Baterias",
      image: "baterias.svg",
    },
    {
      title: "Papéis e Papelão",
      image: "papeis-papelao.svg",
    },
    {
      title: "Residuos Eletrônicos",
      image: "eletronicos.svg",
    },
    {
      title: "Residuos Orgânicos",
      image: "organicos.svg",
    },
    {
      title: "Óleo de Cozinha",
      image: "oleo.svg",
    },
  ]);
}
