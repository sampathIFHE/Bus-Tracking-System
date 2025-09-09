import { Admin } from "src/admins/entities/admin.entity";
import { Bus } from "src/buses/entities/bus.entity";
import { Driver } from "src/driver/entities/driver.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Branch {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    city: string;

    @OneToMany(()=>Driver, (driver)=>driver.branch)
    drivers: Driver[];

    @OneToMany(()=>Bus, (bus)=>bus.branch)
    buses: Bus[];

    @OneToMany(()=>Admin, (admin)=>admin.branch)
    admins: Admin[];

    @OneToMany(()=>User,  (user)=>user.branch)
    users: User[];
}
