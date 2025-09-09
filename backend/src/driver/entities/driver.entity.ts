import { Branch } from "src/branches/entities/branch.entity";
import { Bus } from "src/buses/entities/bus.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Driver {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name:string;

    @Column({ unique: true })
    mobile: string;

  @Column({type: 'json', nullable: true })
   bus:{
    id:string;
    assigned_no:string;
   }

    @Column({nullable: true})
    otp: string;

    @ManyToOne(()=>Branch, (branch)=>branch.drivers)
    branch: Branch;
}
