//
//  DisplayWebViewController.swift
//  BrightPlan Demo App
//
//  Created by Jacqueline Sloves on 3/9/16.
//  Copyright © 2016 Jacqueline Sloves. All rights reserved.
//

import UIKit

class DisplayWebViewController: UIViewController, UIWebViewDelegate {

    @IBOutlet weak var myWebView: UIWebView!
    @IBOutlet weak var myActivityIndicator: UIActivityIndicatorView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        myWebView.delegate = self;
        
        let myProjectBundle:NSBundle = NSBundle.mainBundle();
        
        let filePath:String = myProjectBundle.pathForResource("index", ofType: "html")!
        let myURL = NSURL(fileURLWithPath: filePath);
        let myURLRequest:NSURLRequest = NSURLRequest(URL: myURL);
        
        myWebView.loadRequest(myURLRequest)
    }

    
    @IBAction func refreshButtonTapped(sender: UIBarButtonItem) {
        myWebView.reload();
    }
    
    
    //SHOW/HIDE LOADING:
    func webViewDidStartLoad(webView: UIWebView)
    {
        myActivityIndicator.startAnimating()
    }
    
    func webViewDidFinishLoad(webView: UIWebView)
    {
        myActivityIndicator.stopAnimating()
    }

}

