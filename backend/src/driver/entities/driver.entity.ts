import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  mobile: string;

  @Column({ type: 'json',nullable: true })
  location?: {
  latitude?: string;
  longitude?: string;
  }

  @Column()
  otp: string;
}
