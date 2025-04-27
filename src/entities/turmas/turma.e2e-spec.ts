import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TurmasModule } from './turmas.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

describe('TurmasController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:3000/test'),
        TurmasModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/turmas (POST) cria uma nova turma', async () => {
    const response = await request(app.getHttpServer())
      .post('/turmas')
      .send({
        codigoDisciplina: 'MAT101',
        turno: 'Manhã',
        codigoTurma: 'MAT-1A',
        nomeTurma: 'Matemática - Turma A',
        tipo: 'aluno',
      })
      .expect(201); // espera status 201 - Created

    expect(response.body).toHaveProperty('data');
    expect(response.body.data.codigoDisciplina).toEqual('MAT101');
  });

  it('/turmas (GET) deve retornar lista de turmas', async () => {
    const response = await request(app.getHttpServer())
      .get('/turmas')
      .expect(200); // espera status 200 - OK

    expect(Array.isArray(response.body.data)).toBe(true);
  });
});