import db from "../db/index";

export const serviceGetPosts = async () => {
  const q = `SELECT p.*, u.username 
              FROM vm_posts p JOIN vm_users u 
              ON p.uid = u.id`;

  return db.query(q);
};

export const serviceCreatePost = async (
  content: string,
  tags: string[],
  userId: number
) => {
  const q = `INSERT INTO vm_posts (content, tags, uid)
  VALUES ($1, $2, $3)`;

  return db.query(q, [content, tags, userId]);
};

export const serviceDeletePost = async (id: number, userId: number) => {
  const selectQuery = `SELECT uid FROM vm_posts WHERE id = $1`;
  const deleteQuery = `DELETE FROM vm_posts WHERE id = $1 AND uid = $2`;

  const data = await db.query(selectQuery, [id]);
  if (data.rows.length === 0 || data.rows[0].uid != userId) {
    throw new Error("You are not authorized");
  }

  return db.query(deleteQuery, [id, userId]);
};

export const serviceUpdatePost = async (
  id: number,
  content: string,
  tags: string[],
  userId: number
) => {
  const selectQuery = `SELECT uid FROM vm_posts WHERE id = $1`;
  const updateQuery = `UPDATE vm_posts 
          SET content = $1, tags = $2
          WHERE id = $3 AND uid = $4`;

  const data = await db.query(selectQuery, [id]);
  if (data.rows.length === 0 || data.rows[0].uid != userId) {
    throw new Error("You are not authorized");
  }

  return db.query(updateQuery, [content, tags, id, userId]);
};

export const serviceSearchPosts = async (
  searchTerm: string,
  searchTagArray: string[]
) => {
  let q = `
    SELECT p.*, u.username,
           ts_rank(to_tsvector('english', p.content), to_tsquery('english', $1)) AS rank
    FROM vm_posts p 
    JOIN vm_users u ON p.uid = u.id
    WHERE to_tsvector('english', p.content) @@ to_tsquery('english', $1)
    AND p.tags @> $2::text[]
    ORDER BY rank DESC
  `;

  if (!searchTerm) {
    q = `
    SELECT p.*, u.username
    FROM vm_posts p 
    JOIN vm_users u ON p.uid = u.id
    WHERE p.tags @> $1::text[]
    ORDER BY p.id DESC
  `;
    return db.query(q, [searchTagArray]);
  }

  if (searchTagArray.length === 0) {
    q = `
    SELECT p.*, u.username,
           ts_rank(to_tsvector('english', p.content), to_tsquery('english', $1)) AS rank
    FROM vm_posts p 
    JOIN vm_users u ON p.uid = u.id
    WHERE to_tsvector('english', p.content) @@ to_tsquery('english', $1)
    ORDER BY rank DESC
  `;
    return db.query(q, [searchTerm]);
  }

  return db.query(q, [searchTerm, searchTagArray]);
};
