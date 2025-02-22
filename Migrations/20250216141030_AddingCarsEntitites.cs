using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class AddingCarsEntitites : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "Password",
                table: "Users",
                nullable: false,
                oldClrType: typeof(byte),
                oldType: "tinyint");

            migrationBuilder.CreateTable(
                name: "Cars",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Marca = table.Column<string>(nullable: true),
                    Model = table.Column<string>(nullable: true),
                    Generatie = table.Column<string>(nullable: true),
                    TipCaroserie = table.Column<string>(nullable: true),
                    Pret = table.Column<int>(nullable: false),
                    An = table.Column<int>(nullable: false),
                    Combustibil = table.Column<string>(nullable: true),
                    Kilometrii = table.Column<int>(nullable: false),
                    StareTehnica = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cars", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cars");

            migrationBuilder.AlterColumn<byte>(
                name: "Password",
                table: "Users",
                type: "tinyint",
                nullable: false,
                oldClrType: typeof(byte[]));
        }
    }
}
