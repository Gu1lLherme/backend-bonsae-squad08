import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('usuarios')
  export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    perfil: string;
  
    @Column({ nullable: true })
    subperfil?: string;
  
    @Column()
    nome: string;
  
    @Column({ nullable: true })
    numeroOAB?: string;
  
    @Column({ nullable: true })
    seccional?: string;
  
    @Column()
    email: string;
  
    @Column({ nullable: true })
    matriculaIes?: string;
  
    @Column({ nullable: true })
    telefone?: string;
  
    @Column({ nullable: true })
    cpf?: string;
  
    @Column()
    senha: string;
  
    @Column({ nullable: true })
    periodoCurricular?: string;
  
    @Column({ nullable: true })
    observacoes?: string;
  
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