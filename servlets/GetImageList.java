

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class GetImageList
 */
@WebServlet("/GetImageList")
public class GetImageList extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetImageList() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		Map<String, String> env = System.getenv();
//		for (String envName : env.keySet()) { 
//            System.out.format("%s = %s%n", envName, env.get(envName)); 
//        } 
		String password = null;
		Cookie[] cookies = request.getCookies();
		for (Cookie cookie : cookies) {
			if(cookie.getName().equals("password")) {
				password=cookie.getValue();
			}
		}
		List<String> list=new ArrayList<String>();
		String s=getServletContext().getRealPath("/");
		System.out.println("Current path I got is: " + s);
		File f= new File(s+"images/"+password+"/");
		if(!f.exists()) {
			f.mkdir();
		}
		System.out.println(f.exists());
		String[] paths = f.list();
        for(String path:paths) {
           System.out.println(path);
           list.add('"'+path+'"');
        }
        response.addHeader("images", list.toString()); 
	}

}
