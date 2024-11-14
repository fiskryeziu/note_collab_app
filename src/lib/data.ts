"use server";
import pool from "./db";

export async function getPages() {
  try {
    // sql call here
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
