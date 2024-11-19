"use server";

import { PartialBlock } from "@blocknote/core";
import pool from "./db";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";
import { TNavlinks } from "../../types";

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
    // WARNING: when creating page create also empty notes for that pageId
    revalidatePath("/");
    return { success: true, id, slug, title };
  } catch (error) {
    console.error("Error creating page", error);
    return { success: false, error: "Failed to create page" };
  }
}
