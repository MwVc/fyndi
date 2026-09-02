DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS oauth_accounts CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS fundis CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS job_images CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS fundi_categories;
DROP TABLE IF EXISTS refresh_tokens;

CREATE TABLE areas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE sub_areas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    area_id INTEGER REFERENCES areas(id) ON DELETE CASCADE NOT NULL,
    slug VARCHAR(100) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    avatar_url TEXT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE oauth_accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    provider VARCHAR(20),
    provider_user_id VARCHAR(100),

    -- multi-column constraint 
    UNIQUE (provider, provider_user_id)
);


CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    location VARCHAR(100),
    phone_number VARCHAR(20),
    availability BOOLEAN DEFAULT true,
    rating NUMERIC(2,1) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fundis (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    cate VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    phone_number VARCHAR(20),
    availability BOOLEAN DEFAULT true,
    rating NUMERIC(2,1) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMES~TAMP
);

CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE fundi_categories (
    id SERIAL PRIMARY KEY,
    fundi_id INTEGER REFERENCES fundis(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category_id INTEGER REFERENCES categories(id) NOT NULL,
    location INTEGER REFERENCES sub_areas(id) NOT NULL,
    budget_min NUMERIC(10),
    budget_max NUMERIC(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE job_images (
    id SERIAL PRIMARY KEY,
    job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT NOT NULL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (job_id, image_url)
);

CREATE TABLE refresh_tokens( 
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    expires_at BIGINT NOT NULL,
    created_at BIGINT NOT NULL,
    CONSTRAINT unique_user_token UNIQUE(user_id)
);