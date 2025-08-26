import { Branch } from "src/branches/entities/branch.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum AdminRole {
  SUPERADMIN = 'superadmin',
    ADMIN = 'admin',
    VIEWER = 'viewer',
}

@Entity()
export class Admin {

@PrimaryGeneratedColumn('uuid')
id: string;

@Column()
name:string;

@ManyToOne(()=>Branch, (branch)=>branch.admins)
branch: Branch;

@Column({ unique: true })
mobile: string;

@Column({nullable: true})
otp: string;

@Column({nullable: true})
created_by: string;

@Column({nullable: true})
last_login: string;

@Column({
    type: 'enum',
    enum: AdminRole,
    default: AdminRole.VIEWER,
  })
  role: AdminRole;  
}
