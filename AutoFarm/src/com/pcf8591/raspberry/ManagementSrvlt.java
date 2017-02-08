package com.pcf8591.raspberry;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class ManagementSrvlt
 */
@WebServlet("/ManagementSrvlt")
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
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doAction(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response){
		doAction(request, response);
	}

	private void doAction(HttpServletRequest request,HttpServletResponse response) {
		try {
			System.out.println("Entrando al servlet");
//			String cmdOpt = request.getParameter("cmdOpt").toString();

			String resp = "ObtenerDatos";
			response.setContentType("text/plain");
			response.setContentLength(resp.length());
			PrintWriter out = response.getWriter();
			out.println(resp);
			out.close();
			out.flush();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
