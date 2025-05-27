import {
  Entity,PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn,
} from 'typeorm';

@Entity('turmas')
export class Turma {
  @PrimaryGeneratedColumn()
  id: number;

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
  
  @Column({ type: 'json', nullable: true, default: () => "'[]'" })
  usuarios?: string[]; 
  @Column()
  batchId: string;

  @Column({ default: false })
  valid: boolean;

  @Column({ type: 'json', nullable: true })
  validationErrors?: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}