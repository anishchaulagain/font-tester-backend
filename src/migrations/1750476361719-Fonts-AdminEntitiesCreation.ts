import { MigrationInterface, QueryRunner } from "typeorm";

export class FontsAdminEntitiesCreation1750476361719 implements MigrationInterface {
    name = 'FontsAdminEntitiesCreation1750476361719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`fonts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`category\` varchar(255) NOT NULL, \`subsets\` text NOT NULL, \`google_fonts_url\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admin_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_dcd0c8a4b10af9c986e510b9ec\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_dcd0c8a4b10af9c986e510b9ec\` ON \`admin_users\``);
        await queryRunner.query(`DROP TABLE \`admin_users\``);
        await queryRunner.query(`DROP TABLE \`fonts\``);
    }

}
