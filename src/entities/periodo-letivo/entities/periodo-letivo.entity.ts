import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('periodos_letivos')
  export class PeriodoLetivo {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    codigoPeriodoLetivo: string;
  
    @Column()
    periodoLetivo: string;
  
    @Column({ type: 'date' })
    dataInicial: Date;
  
    @Column({ type: 'date' })
    dataFinal: Date;
  
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