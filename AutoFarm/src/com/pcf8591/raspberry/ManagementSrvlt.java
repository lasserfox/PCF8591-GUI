package com.pcf8591.raspberry;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.stream.Stream;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pi4j.io.gpio.GpioController;
import com.pi4j.io.gpio.GpioFactory;
import com.pi4j.io.i2c.I2CBus;
import com.pi4j.io.i2c.I2CDevice;
import com.pi4j.io.i2c.I2CFactory;
import com.sun.jmx.snmp.Timestamp;

public class ManagementSrvlt extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ManagementSrvlt() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
		doAction(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,HttpServletResponse response) {
		doAction(request, response);
	}

	private void doAction(HttpServletRequest request, HttpServletResponse response) {
		try {
			String cmdOpt = request.getParameter("cmdOpt").toString();

			if ("leer".equalsIgnoreCase(cmdOpt)) {
				int canal = new Integer(request.getParameter("canal").toString()).intValue();
				int val = leerData(canal);
				String resp = new Integer(val).toString();
				System.out.println(resp);
				response.setContentType("text/plain");
				response.setContentLength(resp.length());
				PrintWriter out = response.getWriter();
				out.println(resp);
				out.close();
				out.flush();
			} else if ("leerHistorico".equalsIgnoreCase(cmdOpt)){
	
				String escala = request.getParameter("escala").toString();
				int rango = new Integer(request.getParameter("rango").toString()).intValue();
				Path path = Paths.get("/root/datos.txt");
				
				String result = new String(Files.readAllBytes(path));
				System.out.println(result);
				response.setContentType("text/plain");
				response.setContentLength(result.length());
				PrintWriter out = response.getWriter();
				out.println(result);
				out.close();
				out.flush();
			}
			
			

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	private int leerData(int canal) {
		int result = 0;
		try {
			result=(int)(Math.random()*255);	
			final I2CBus bus = I2CFactory.getInstance(I2CBus.BUS_1);
			I2CDevice initDevice = bus.getDevice(0x48);
			initDevice.write(0x48, (byte) 0);
//			System.out.println(initDevice.read(0x48));
			result = initDevice.read(0x48+canal);
		} catch (Exception e) {}
		return result;
	}

//	private void dbWrite(int canal, int valor) {
//		Path path = Paths.get("farmData.txt");
//		try (BufferedWriter writer = Files.newBufferedWriter(path)) 
//		{
//			Date fechaLectura = GregorianCalendar.getInstance().getTime();
//		    writer.write(fechaLectura + " - " + canal + " - " + valor + "\n");
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		
//	}

}
