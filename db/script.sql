CREATE TABLE bruxos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    casa VARCHAR(50) NOT NULL,
    habilidade VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    patrono VARCHAR(100)
);

CREATE TABLE varinhas (
    id SERIAL PRIMARY KEY,
    material VARCHAR(50) NOT NULL,
    comprimento FLOAT NOT NULL,
    nucleo VARCHAR(50) NOT NULL,
    data_fabricacao DATE NOT NULL,
    bruxo_id INT REFERENCES bruxos(id)
);