using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Servistar.Server.Migrations
{
    /// <inheritdoc />
    public partial class Customer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SecondLastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    BirthDate = table.Column<DateTime>(type: "Date", nullable: true),
                    RegistrationDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Customers_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Municipalities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Minicipality = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Key = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Municipalities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CustumersPhoneNumbers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: false),
                    Principal = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustumersPhoneNumbers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustumersPhoneNumbers_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CustomersAddress",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    Number = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Street = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Colony = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MinicipalityId = table.Column<int>(type: "int", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostalCode = table.Column<int>(type: "int", nullable: false),
                    Principal = table.Column<bool>(type: "bit", nullable: false),
                    References = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomersAddress", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomersAddress_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CustomersAddress_Municipalities_MinicipalityId",
                        column: x => x.MinicipalityId,
                        principalTable: "Municipalities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2", null, "Recepcionista", "RECEPCIONISTA" },
                    { "3", null, "Tecnico", "TECNICO" }
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "99999999",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "597aa418-b341-407c-b680-92615751006b", "AQAAAAIAAYagAAAAECQ15yA3ajNX6JYZP1P5ay27FvIOm0UIeo+V3ssMUzvv3OyMnH7L/SVHpZI3KW+lTg==", "1c083418-4b78-4983-8b3f-ca424c4dd5d0" });

            migrationBuilder.InsertData(
                table: "Municipalities",
                columns: new[] { "Id", "Key", "Minicipality" },
                values: new object[,]
                {
                    { 1, "001", "Armería" },
                    { 2, "002", "Colima" },
                    { 3, "003", "Comala" },
                    { 4, "004", "Coquimatlán" },
                    { 5, "005", "Cuauhtémoc" },
                    { 6, "006", "Ixtlahuacán" },
                    { 7, "007", "Manzanillo" },
                    { 8, "008", "Minatitlán" },
                    { 9, "009", "Tecomán" },
                    { 10, "010", "Villa de Álvarez" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Customers_UserId",
                table: "Customers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomersAddress_CustomerId",
                table: "CustomersAddress",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomersAddress_MinicipalityId",
                table: "CustomersAddress",
                column: "MinicipalityId");

            migrationBuilder.CreateIndex(
                name: "IX_CustumersPhoneNumbers_CustomerId",
                table: "CustumersPhoneNumbers",
                column: "CustomerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomersAddress");

            migrationBuilder.DropTable(
                name: "CustumersPhoneNumbers");

            migrationBuilder.DropTable(
                name: "Municipalities");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "99999999",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "15a6ae70-15d8-4fea-8d3e-71f532d253ef", "AQAAAAIAAYagAAAAEG+7quYr5qyh0+2VJ1CCChxP0Gn0Tgdib2+jbnwqe5yK4Dboy9zFY8JFzKogRBaF2Q==", "6a37cfac-c7fb-4e3a-8ed4-a7efda0fb072" });
        }
    }
}
