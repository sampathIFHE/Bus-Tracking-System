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

   @OneToOne(() => Bus, (bus) => bus.driver, { nullable: true })
   bus: Bus;

    @Column({nullable: true})
    otp: string;

    @ManyToOne(()=>Branch, (branch)=>branch.drivers)
    branch: Branch;
}
