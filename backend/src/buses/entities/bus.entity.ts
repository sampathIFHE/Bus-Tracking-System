import { Branch } from 'src/branches/entities/branch.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum UserCategory {
  STUDENT = 'student',
  EMPLOYEE = 'employee',
}

@Entity()
export class Bus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  assigned_no: string;

  @Column({ unique: true })
  registration_no: string;

  @Column({ nullable: true })
  no_of_seats: number;

  @Column('jsonb',{ nullable: true })
  coordinator: {
    id: string;
    name: string;
    mobile: string;
  };

  @Column({ nullable: true })
  latitude: number;

  @Column({ nullable: true })
  longitude: number;

  @Column({ nullable: true })
  route: string;

  @Column({ nullable: true })
  accuracy: string;

  @Column({ nullable: true })
  speed: string;

  @Column({ nullable: true })
  last_updated: string;

  @Column('text', { array: true, default: [] })
  passengers: string[];

  @Column({
    type: 'enum',
    enum: UserCategory,
    default: UserCategory.STUDENT,
  })
  category: UserCategory;

  @Column('jsonb',{ nullable: true })
  driver: { 
    name: string;
    mobile: string;
  };

  @Column('jsonb',{ nullable: true })
  tempory_driver: {
    id: string;
    name: string;
    mobile: string;
  };

  @Column({ nullable: true })
  current_stop: string;

   @ManyToOne(()=>Branch, (branch)=>branch.buses)
   branch: Branch;
}
