const pool = require("../lib/db.js");
const { pages, notes, users } = require("../lib/placeholder-data.js");

async function seed() {
  try {
    for (const user of users) {
      await pool.query(
        `INSERT INTO users (id, name, email, password)
         VALUES ($1, $2, $3, $4)`,
        [user.id, user.name, user.email, user.password],
      );
      console.log(`Inserted user: ${user.name}`);
    }

    for (const page of pages) {
      await pool.query(
        `INSERT INTO pages (id, title,cover, icon, slug, user_id,is_favorite)
         VALUES ($1, $2, $3, $4, $5, $6,$7)`,
        [
          page.id,
          page.title,
          page.cover,
          page.icon,
          page.slug,
          page.userId,
          page.isFavorite,
        ],
      );
      console.log(`Inserted page: ${page.title}`);
    }

    for (const note of notes) {
      await pool.query(
        `INSERT INTO notes (id, page_id, document)
         VALUES ($1, $2, $3)`,
        // NOTE: the blocks based on the page id will get saved as a json whole doc.
        [note.id, note.pageId, JSON.stringify(note.document)],
      );

      console.log(`Inserted note with ID: ${note.id}`);
    }
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    await pool.end();
  }
}

seed();
