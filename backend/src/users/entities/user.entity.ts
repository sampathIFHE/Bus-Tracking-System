import { Branch } from "src/branches/entities/branch.entity";
import { Bus} from "src/buses/entities/bus.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum EmployeeCategory {
    COORDINATOR = 'coordinator',
    PASSENGER ="passenger"
}
export enum UserCategory {
  STUDENT = 'student',
  EMPLOYEE = 'employee',
}


@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(()=>Branch, (branch)=>branch.buses)
    branch: Branch;

    @ManyToOne(()=>Bus, (bus)=>bus.users)
    bus: Bus;
    
    @Column()
    name: string;

    @Column({unique:true})
    mobile: string;

    @Column({
        type: 'enum',
        enum:UserCategory,
        default: UserCategory.STUDENT,
    })
    user_category: UserCategory;

    @Column({unique:true, nullable:true})
    user_ID: string;

    @Column({nullable:true})
    otp: string;

    @Column({nullable:true})
    valid_till: string;

    @Column({
        type: 'enum',
        enum:EmployeeCategory,
        default: null,
    })
    employee_category: EmployeeCategory;

    @Column()
    stop: string;

    @Column()
    created_by: string;

    @Column({nullable:true})
    isActive:boolean;
}
