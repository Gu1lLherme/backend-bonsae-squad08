import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TurmasModule } from '../../src/entities/turmas/turmas.module'; // ajuste o caminho conforme sua estrutura
import { MongooseModule } from '@nestjs/mongoose';

describe('TurmaController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/testdb'), // Test DB
        TurmasModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/turmas (POST) - deve criar uma turma com sucesso', async () => {
    const turmaMock = {
      codigoDisciplina: 'MAT101',
      turno: 'manhã',
      codigoTurma: 'TURMA001',
      nomeTurma: 'Turma A',
      tipo: 'aluno',
    };

    const response = await request(app.getHttpServer())
      .post('/turmas')
      .send(turmaMock)
      .expect(201);

    expect(response.body).toHaveProperty('message', 'Turma criada com sucesso!');
    expect(response.body.data).toHaveProperty('_id');
    expect(response.body.data.codigoDisciplina).toBe('MAT101');
  });

  it('/turmas (POST) - deve falhar se turno for inválido', async () => {
    const turmaInvalida = {
      codigoDisciplina: 'MAT102',
      turno: 'meio-dia', // inválido
      codigoTurma: 'TURMA002',
      nomeTurma: 'Turma B',
      tipo: 'professor',
    };

    const response = await request(app.getHttpServer())
      .post('/turmas')
      .send(turmaInvalida)
      .expect(400);

    expect(response.body.message).toContain('turno must be one of the following values');
  });
});