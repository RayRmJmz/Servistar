using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Servistar.Server.Migrations
{
    /// <inheritdoc />
    public partial class brands : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Appliances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Appliance = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appliances", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Brands",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Brand = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brands", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "99999999",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "955c58d8-a2bf-481e-b5cd-70abee9f9cec", "AQAAAAIAAYagAAAAEAruxuQR3Al0gMquO3m4Y5VMtD5rmSWL2snKk5qnzL4vQAC7t8QOWzz5ELQacqMrpg==", "9ec2679e-2ef4-407d-a0ea-ecda4cd57a87" });

            migrationBuilder.CreateIndex(
                name: "IX_Appliances_Appliance",
                table: "Appliances",
                column: "Appliance",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Brands_Brand",
                table: "Brands",
                column: "Brand",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Appliances");

            migrationBuilder.DropTable(
                name: "Brands");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "99999999",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2a846ee8-9394-42f3-9c8f-8491a6453c5b", "AQAAAAIAAYagAAAAEIi2w9l4ppV2VLoToQJWGE8KZnAsy7A0P5j7fL0vBZRyLQXi7wkz5nNh7n3bFu1oEQ==", "f9408fb2-fd59-4dfd-81b2-82533b41571e" });
        }
    }
}
