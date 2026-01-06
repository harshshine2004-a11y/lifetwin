import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("nvarchar", { nullable: true, length: "MAX" })
  prompt!: string;

  @Column("nvarchar", { nullable: true, length: "MAX" })
  response!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
