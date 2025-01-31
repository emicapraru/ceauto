using System;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models

{

    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [Required]
        public string Country { get; set; }

        public DateTime LastUptdatedOn { get; set; }

        public int LastUptdatedBy { get; set; }
    }
}