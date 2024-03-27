using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Servistar.Server.Migrations
{
    /// <inheritdoc />
    public partial class phone : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustumersPhoneNumbers_Customers_CustomerId",
                table: "CustumersPhoneNumbers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CustumersPhoneNumbers",
                table: "CustumersPhoneNumbers");

            migrationBuilder.RenameTable(
                name: "CustumersPhoneNumbers",
                newName: "PhoneBook");

            migrationBuilder.RenameIndex(
                name: "IX_CustumersPhoneNumbers_CustomerId",
                table: "PhoneBook",
                newName: "IX_PhoneBook_CustomerId");

            migrationBuilder.AlterColumn<int>(
                name: "CustomerId",
                table: "PhoneBook",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "PhoneBook",
                type: "nvarchar(34)",
                maxLength: 34,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PhoneBook",
                table: "PhoneBook",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "99999999",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "b34cb754-0af9-4201-b6da-8c8486485f9c", "AQAAAAIAAYagAAAAEPpE2Fb4QTQsQnupRPQe4hW6OMJnClPJe7RkaYVNOyo5trCUti3eDBWJXa6ArkKiAg==", "8a232f8a-8534-4cc2-b323-621fed69f684" });

            migrationBuilder.CreateIndex(
                name: "IX_PhoneBook_PhoneNumber",
                table: "PhoneBook",
                column: "PhoneNumber",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PhoneBook_Customers_CustomerId",
                table: "PhoneBook",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PhoneBook_Customers_CustomerId",
                table: "PhoneBook");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PhoneBook",
                table: "PhoneBook");

            migrationBuilder.DropIndex(
                name: "IX_PhoneBook_PhoneNumber",
                table: "PhoneBook");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "PhoneBook");

            migrationBuilder.RenameTable(
                name: "PhoneBook",
                newName: "CustumersPhoneNumbers");

            migrationBuilder.RenameIndex(
                name: "IX_PhoneBook_CustomerId",
                table: "CustumersPhoneNumbers",
                newName: "IX_CustumersPhoneNumbers_CustomerId");

            migrationBuilder.AlterColumn<int>(
                name: "CustomerId",
                table: "CustumersPhoneNumbers",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustumersPhoneNumbers",
                table: "CustumersPhoneNumbers",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "99999999",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "597aa418-b341-407c-b680-92615751006b", "AQAAAAIAAYagAAAAECQ15yA3ajNX6JYZP1P5ay27FvIOm0UIeo+V3ssMUzvv3OyMnH7L/SVHpZI3KW+lTg==", "1c083418-4b78-4983-8b3f-ca424c4dd5d0" });

            migrationBuilder.AddForeignKey(
                name: "FK_CustumersPhoneNumbers_Customers_CustomerId",
                table: "CustumersPhoneNumbers",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
