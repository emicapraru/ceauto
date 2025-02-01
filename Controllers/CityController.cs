using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Data.Repo;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Authorize]
    public class CityController : BaseController
    {
        private readonly DataContext dc;

        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        public CityController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        // GET api/city
        [HttpGet]
        //all methods are protected unless this one
        [AllowAnonymous]
        public async Task<IActionResult> GetCities()
        {
            //throw new UnauthorizedAccessException();
            var cities = await uow.CityRepository.GetCitiesAsync();
            //mapeaza doar elementele publice
            var cititesDto = mapper.Map<IEnumerable<CityDto>>(cities);
            return Ok(cititesDto);
        }

        // // Post city/add?cityName=Miami
        // // Post city/add/Los Angeles
        // [HttpPost("add")]
        // [HttpPost("add/{cityName}")]
        // public async Task<IActionResult> AddCity(string cityName)
        // {

        //     City city = new City();
        //     city.Name = cityName;
        //     await dc.Cities.AddAsync(city);
        //     await dc.SaveChangesAsync();
        //     return Ok(city);
        // }

        //Post city/post --Post the data in JSON Format using PostMan
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {

            var city = mapper.Map<City>(cityDto);
            city.LastUptdatedBy = 1;
            city.LastUptdatedOn = DateTime.Now;

            uow.CityRepository.AddCity(city);
            await uow.SaveAsync();
            //return Ok(city);
            return StatusCode(201);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityDto cityDto)
        {

            if (id != cityDto.Id)
                return BadRequest("Update not allowed");

            var cityFromDb = await uow.CityRepository.FindCity(id);

            if (cityFromDb == null)
                return BadRequest("Update not allowed");

            cityFromDb.LastUptdatedBy = 1;
            cityFromDb.LastUptdatedOn = DateTime.Now;
            mapper.Map(cityDto, cityFromDb);

            //throw new Exception("Some unkown error");
            await uow.SaveAsync();
            return StatusCode(200);


        }

        [HttpPut("updateCityName/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityUpdateDto cityDto)
        {
            var cityFromDb = await uow.CityRepository.FindCity(id);
            cityFromDb.LastUptdatedBy = 1;
            cityFromDb.LastUptdatedOn = DateTime.Now;
            mapper.Map(cityDto, cityFromDb);
            await uow.SaveAsync();
            return StatusCode(200);
        }


        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateCityPatch(int id, JsonPatchDocument<City> cityToPatch)
        {
            var cityFromDb = await uow.CityRepository.FindCity(id);
            cityFromDb.LastUptdatedBy = 1;
            cityFromDb.LastUptdatedOn = DateTime.Now;

            cityToPatch.ApplyTo(cityFromDb, ModelState);
            await uow.SaveAsync();
            return StatusCode(200);
        }


        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            uow.CityRepository.DeleteCity(id);
            await uow.SaveAsync();
            return Ok(id);
        }
    }
}
