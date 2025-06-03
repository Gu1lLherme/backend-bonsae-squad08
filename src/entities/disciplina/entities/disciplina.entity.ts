import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('disciplinas') 
  export class Disciplina {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    periodoLetivo: string; 
  
    @Column()
    disciplina: string;
  
    @Column()
    codigoDisciplina: string;
  
    @Column({ type: 'date' })
    dataInicial: Date;
  
    @Column({ type: 'date' })
    dataFinal: Date;
  
    @Column()
    categoria: string;
  
    @Column({ nullable: true })
    periodoCurricular?: string;
  
    @Column({ nullable: true })
    estado?: string;
  
    @Column({ nullable: true })
    campus?: string;
  
    @Column()
    batchId: string; // Identificador do lote
  
    @Column({ default: false })
    valid: boolean;
  
    @Column({ type: 'json', nullable: true })
    validationErrors?: string[]; // Lista de erros como array JSON
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }