import { Branch } from "src/branches/entities/branch.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Driver {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name:string;

    @Column({ unique: true })
    mobile: string;

    @Column({unique:true})
    BusAssigned: string;

    @Column({nullable: true})
    otp: string;

    @ManyToOne(()=>Branch, (branch)=>branch.drivers)
    branch: Branch;
}
