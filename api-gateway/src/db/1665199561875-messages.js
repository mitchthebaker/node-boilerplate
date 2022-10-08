const { Table } = require("typeorm");

module.exports = class Messages1665199561875 {
    async up(queryRunner) {
      await queryRunner.createTable(
        new Table({
          columns: [
            {
              isPrimary: true,
              length: "36",
              name: "id",
              type: "char"
            },
            {
              length: "500",
              name: "message",
              type: "varchar"
            },
            {
              default: "now()",
              name: "createdAt",
              type: "timestamp"
            }
          ],
          name: "messages"
        })
      );
    }

    async down(queryRunner) {
      await queryRunner.dropTable("messages");
    }
}
