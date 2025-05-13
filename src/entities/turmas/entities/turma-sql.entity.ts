import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

    

@Entity('turmas')
export class TurmaSQLEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  codigoDisciplina: string;

  @Column()
  turno: string;

  @Column()
  codigoTurma: string;

  @Column()
  nomeTurma: string;

  @Column()
  tipo: string;

  @Column('simple-json', { nullable: true })
  usuarios: any[];
}

