/*
  Part of the Androrat project - https://github.com/RobinDavid/androrat

  Copyright (c) 2012 Robin David

  This library is free software; you can redistribute it and/or
  modify it under the terms of the GNU Lesser General Public
  License as published by the Free Software Foundation, version 3.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General
  Public License along with this library; if not, write to the
  Free Software Foundation, Inc., 59 Temple Place, Suite 330,
  Boston, MA  02111-1307  USA
*/
package gui;

import java.util.ArrayList;
import java.util.List;
import javax.swing.table.AbstractTableModel;

public class UserModel extends AbstractTableModel {
    
	/*
    private final List<User> users = new ArrayList<User>();
    private final String[] headers = {"IMEI", "Localisation", "Num�ro tel", "Op�rateur", "Pays SIM", "Op�rateur SIM", "Serial SIM"};

    public UserModel() {
        super();
    }
    
    @Override
    public int getRowCount() {
        return users.size();
    }

    @Override
    public int getColumnCount() {
        return headers.length;
    }
    
    @Override
    public String getColumnName(int columnIndex) {
        return headers[columnIndex];
    }

    @Override
    public Object getValueAt(int rowIndex, int columnIndex) {
        switch(columnIndex){
            case 0:
                return users.get(rowIndex).getImei();
            case 1:
                return users.get(rowIndex).getCountryCode();
            case 2:
                return users.get(rowIndex).getTelNumber();
            case 3:
                return users.get(rowIndex).getOperator();
            case 4:
                return users.get(rowIndex).getSimCountryCode();
            case 5:
                return users.get(rowIndex).getSimOperator();
            case 6:
                return users.get(rowIndex).getSimSerial();
            default:
                return null;
        }
    }
    
    public void addUser(User user) {
        users.add(user);
        fireTableRowsInserted(users.size()-1, users.size()-1);
    }
    
    public void removeUser(String imei) {
        for(User user : users) {
            if(user.getImei().equals(imei)) {
                users.remove(user);
                return ;
            }
        }
    }
    */
    private final List<User> users = new ArrayList<User>();
    private final String[] headers = {"Flag","IMEI", "Location", "Phone Number", "Operator", "Country SIM", "Operator SIM", "Serial SIM"};

    public UserModel() {
        super();
    }
    
    @Override
    public int getRowCount() {
        return users.size();
    }

    @Override
    public int getColumnCount() {
        return headers.length;
    }
    
    @Override
    public String getColumnName(int columnIndex) {
        return headers[columnIndex];
    }
/*
    @Override
    public Object getValueAt(int rowIndex, int columnIndex) {
        switch(columnIndex){
            case 0:
            	return users.get(rowIndex).getImei();
            case 1:
            	  return users.get(rowIndex).getCountryCode();
            case 2:
            	 return users.get(rowIndex).getTelNumber();
            case 3:
            	  return users.get(rowIndex).getOperator();
            case 4:
            	 return users.get(rowIndex).getSimCountryCode();
            case 5:
            	 return users.get(rowIndex).getSimOperator();
            case 6 :
            	return users.get(rowIndex).getSimSerial();
            default:
                return null;
        }
    }
    */
  //*
    @Override
    public Object getValueAt(int rowIndex, int columnIndex) {
    	if(rowIndex < users.size()) {
	        switch(columnIndex){
	            case 0:
	            	return users.get(rowIndex).getImage();
	            case 1:
	            	return users.get(rowIndex).getImei();
	            case 2:
	            	  return users.get(rowIndex).getCountryCode();
	            case 3:
	            	 return users.get(rowIndex).getTelNumber();
	            case 4:
	            	  return users.get(rowIndex).getOperator();
	            case 5:
	            	 return users.get(rowIndex).getSimCountryCode();
	            case 6:
	            	 return users.get(rowIndex).getSimOperator();
	            case 7 :
	            	return users.get(rowIndex).getSimSerial();
	            default:
	                return null;
	        }
    	} else return null;
    }
   // */
    public void addUser(User user) {
        users.add(user);
        fireTableRowsInserted(users.size()-1, users.size()-1);
    }
    
    public void removeUser(String imei) {
        for(User user : users) {
            if(user.getImei().equals(imei)) {
                users.remove(user);
                return ;
            }
        }
    }
}
