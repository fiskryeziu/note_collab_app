"use server";

import { PartialBlock } from "@blocknote/core";
import pool from "./db";
import { v4 as uuidv4 } from "uuid";

export async function getPages() {
  try {
    const data = await pool.query(
      `SELECT * FROM pages ORDER BY created_at ASC`,
    );
    return data.rows;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
}
export async function getContentByPagesId(id: string) {
  try {
    const data = await pool.query(
      `SELECT document FROM notes WHERE page_id='${id}'`,
    );
    return data.rows[0].document;
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
    await pool.query(
      `UPDATE notes SET document = '${JSON.stringify(content)}' WHERE page_id = '${pageId}'`,
    );
  } catch (error) {
    console.error("Error saving content to server:", error);
  }
}

export async function createPage(): Promise<
  | { success: true; id: string; slug: string; title: string }
  | { success: false; error: string }
> {
  try {
    const userId = "410544b2-4001-4271-9855-fec4b6a6442a";
    const id = uuidv4();
    const slug = uuidv4();
    const title = "New page";

    console.log("create Page");
    await pool.query(
      `INSERT INTO pages (id, slug, title, user_id) VALUES ('${id}','${slug}','${title}','${userId}')`,
    );
    await pool.query(
      `INSERT INTO notes (id, page_id,document) VALUES ($1,$2,$3)`,
      [uuidv4(), id, JSON.stringify([])],
    );

    return { success: true, id, slug, title };
  } catch (error) {
    console.error("Error creating page", error);
    return { success: false, error: "Failed to create page" };
  }
}

export async function updatePageTitle(pageId: string, newTitle: string) {
  try {
    await pool.query(
      `UPDATE pages SET title = '${newTitle}' WHERE id = '${pageId}'`,
    );
  } catch (error) {
    console.log("Error updating the title", error);
  }
}
export async function updatePageIcon(pageId: string, newIcon: string) {
  try {
    await pool.query(
      `UPDATE pages SET icon = '${newIcon}' WHERE id = '${pageId}'`,
    );
  } catch (error) {
    console.log("Error updating the title", error);
  }
}
export async function updatePageCover(pageId: string, newCover: string) {
  try {
    await pool.query(
      `UPDATE pages SET cover = '${newCover}' WHERE id = '${pageId}'`,
    );
  } catch (error) {
    console.log("Error updating the title", error);
  }
}
export async function deletePage(pageId: string) {
  try {
    await pool.query(`DELETE FROM pages WHERE id = '${pageId}'`);
    return { success: true };
  } catch (error) {
    console.log("Error updating the title", error);
  }
}
