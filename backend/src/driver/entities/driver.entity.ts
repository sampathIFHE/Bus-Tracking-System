import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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
}
