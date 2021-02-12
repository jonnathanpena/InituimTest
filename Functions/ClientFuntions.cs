﻿using InitiumTest.Models;
using InitiumTest.Utils;
using System;
using System.Linq;

namespace InitiumTest.Functions
{
    /*
        Clase ClientFuntions
        Contiene las funciones que corresponden a la entidad de clientes
    */
    public class ClientFuntions
    {
        // Variable global para la función, donde maneja el context
        private readonly ApplicationDbContext _db;

        // Contructor para cargar la variable global _db
        public ClientFuntions(ApplicationDbContext db)
        {
            _db = db;
        }

        public ClientInsertResponse CreateOrUpdate(Client client)
        {
            // Iniciamos la variable que vamos a retornar
            ClientInsertResponse clientInsertResponse = new ClientInsertResponse();
            clientInsertResponse.Id = 0;
            try
            {
                // Consultamos el cliente por su ClientIdentification
                Client clientInserted = _db.Client.FirstOrDefault(c => c.ClientIdentification == client.ClientIdentification);
                // De no existir hacemos la inserción
                if (clientInserted == null)
                {
                    _db.Client.Add(client);
                    _db.SaveChanges();
                    clientInsertResponse.Id = client.Id;
                } 
                // Caso que exista editamos
                else
                {
                    clientInserted.ClientName = client.ClientName;
                    _db.SaveChanges();
                    clientInsertResponse.Id = clientInserted.Id;
                }
            // Capturamos la excepción
            } catch (Exception e)
            {
                // Guardamos la excepción encontrada en un archivo log
                Log.LOG("CONTROLADOR: ClientFunctions, FUNCIÓN: CreateOrUpdate(), PARÁMETROS: Client.Identification = "+ client.ClientIdentification +", Client.Name = "+ client.ClientName +" ERROR: " + e.Message);
                clientInsertResponse.Exception = e.Message;
            }

            return clientInsertResponse;
        }

    }
}
