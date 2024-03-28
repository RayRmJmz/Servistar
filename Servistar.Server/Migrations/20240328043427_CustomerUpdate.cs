using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Servistar.Server.Migrations
{
    /// <inheritdoc />
    public partial class CustomerUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Customers",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "99999999",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2a846ee8-9394-42f3-9c8f-8491a6453c5b", "AQAAAAIAAYagAAAAEIi2w9l4ppV2VLoToQJWGE8KZnAsy7A0P5j7fL0vBZRyLQXi7wkz5nNh7n3bFu1oEQ==", "f9408fb2-fd59-4dfd-81b2-82533b41571e" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Customers");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "99999999",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "b34cb754-0af9-4201-b6da-8c8486485f9c", "AQAAAAIAAYagAAAAEPpE2Fb4QTQsQnupRPQe4hW6OMJnClPJe7RkaYVNOyo5trCUti3eDBWJXa6ArkKiAg==", "8a232f8a-8534-4cc2-b323-621fed69f684" });
        }
    }
}
