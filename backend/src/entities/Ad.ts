import { IsEmail, IsUrl, Length, Max, Min } from "class-validator";
import { BaseEntity, BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";

@Entity("ad")
export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @ManyToOne(() => Category, (category) => category.ads, {eager: true} )
    category!: Category;

    @ManyToMany(() => Tag, (tag) => tag.ads)
    @JoinTable()
    tags!: Tag[]; 

    @Column({ length: 100 })
    @Length(5, 100, {message: "Entre 5 et 100 caractères"})
    title!: string;
    
    @Column({ length: 500})
    @Length(10, 500, {message: "Entre 10 et 500 caractères"})
	description!: string; 

    @Column()
    @IsEmail()
	owner!: string; 

	@Column()
    @Min(0)
    @Max(100000)
    price!: number;

    @Column()
    @IsUrl()
    picture!: string; 

    @Column({ length: 110})
    @Length(2, 110, {message: "Entre 2 et 110 caractères"})
    location!: string; 

	@Column()
    createdAt!: Date; 

    @BeforeInsert()
    private setCreatedAt(){
        this.createdAt = new Date();
    }

}