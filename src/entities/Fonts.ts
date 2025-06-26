import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("fonts")
export class Font {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  category!: string;

  @Column("simple-array")
  subsets!: string[];

  @Column()
  google_fonts_url!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
