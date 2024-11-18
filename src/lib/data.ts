"use server";

import { PartialBlock } from "@blocknote/core";
import pool from "./db";

export async function getPages() {
  try {
    const data = await pool.query(`SELECT * FROM pages`);

    return data.rows;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
}
export async function getContentByPagesId(id: string) {
  try {
    // sql call here
    const data = await pool.query(
      `SELECT document FROM notes WHERE page_id='${id}'`,
    );

    return data.rowCount === 0 ? data.rows : data.rows[0].document;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
}

export async function saveContentToServer(
  content: PartialBlock[],
  pageId: string,
) {
  try {
    console.log("Saving to database...");
    // await pool.query(
    //   `UPDATE notes SET document = '${JSON.stringify(content)}' WHERE page_id = '${pageId}'`,
    // );
  } catch (error) {
    console.error("Error saving content to server:", error);
  }
}
